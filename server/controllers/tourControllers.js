const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image Please upload onlt images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);
//fields because we have multiple fields at the tour model will hold images
// upload.array('images', 3);  req.files // if we have sing field hold mutiple image at the model
// upload.single('') req.file

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);
  if (!req.files.imageCover || !req.files.images) return next();

  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  req.body.images = [];

  // [1] cover image
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // [2] images
  const arrayOfPromises = req.files.images.map(async (file, i) => {
    const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
    await sharp(file.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${filename}`);

    req.body.images.push(filename);
  });

  await Promise.all(arrayOfPromises);

  next();
});

exports.getAllTours = factory.getAll(Tour);
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });

exports.aliasTopTours = (req, res, next) => {
  req.query.sort = 'price,-ratingsAverage';
  req.query.limit = '5';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgRating: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { stats },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${+year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { numTourStarts: -1 } },
    // { $limit: 12 },
  ]);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { plan },
  });
});
exports.getTourWithin = catchAsync(async (req, res, next) => {
  const { distance, coordinats, unit } = req.params;
  const [lat, lng] = coordinats.split(',');
  if (!lat || !lng) {
    next(
      new AppError('Please provide your coordinates in the format lat,lng', 400)
    );
  }

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  //geoWithIn:is geospecial operator wich find value within specific geometry
  //geospatial query
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    stats: 'success',
    result: tours.length,
    data: {
      data: tours,
    },
  });
});
exports.getDistances = catchAsync(async (req, res, next) => {
  const { coordinats, unit } = req.params;
  const [lat, lng] = coordinats.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    next(
      new AppError('Please provide your coordinates in the format lat,lng', 400)
    );
  }
  //geospatial aggregation
  //$geoNear:it has to be the first stage at the pipline and this is the only geospatial aggregation stage and it requires that at leaset one of ourfields contains geospatial index
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    stats: 'success',
    data: {
      data: distances,
    },
  });
});

const arr = [1, 5, 3, 6];
function ddd(target, arr) {
  const modifiedarr = new Set(arr);
  return target === 10;
}

/* NOTEs
  __dealing with url parameters
  .we can expect as many vars/parameters as you can and also u can make it optional by adding "?" at the end
  
  __middleware
  .express does not put that body data on the request in order to have that data we have to use "middleware", and the step the request go through, in this example is simply that the data from the body is added to it to the request object
  req.body  =>> body prop gonna be available on req because of middleware

  __Model
  calling model functions (find , findOne) returns a promise of a query object which has a lot of methods at its prototype
   that u can chain them to create a complex query object to handel all the features ..... then you can await the promise of that entire query

  __parameters 
  "/api/v1/tours/?duration=5&difficulty=easy"
req.query = {duration: '5', difficulty:'easy'}

"/api/v1/tours/?duration[gte]=5&difficulty=easy"
req.query = { difficulty: 'easy', duration: { gte: '5' } }
{ difficulty: 'easy', duration: { '$gte': '5' } } after replace the operators

____mongodb aggregation pipeline : define a pipeline that all documents from a certain collection go through where they are processed step by step in order to transform them into aggregated results (avreages ,minimum , maxmimum)
  */

/*
// exports.getAllTours = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   const tours = await features.query;
//   // SEND RES
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: { tours },
//   });
// });

// exports.createTour = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body); // here we call the method directly on the model
//   res.status(201).json({ status: 'success', data: { tour: newTour } }); //201 stands for created
// });

// exports.getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   // Tour.findOne({ _id: req.params.id}) //mongo itself
//   if (!tour) {
//     //we return here becuse otherwise we are trying to send two  response
//     // we call next here because the catchAsync will not catch it so it will not call net there
//     //so by using next here will jupm straigforword to the global handel middlware
//     return next(new AppError('No tour has found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     data: { tour: tour },
//   });
// });

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!tour) {
//     return next(new AppError('No tour has found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     data: { tour: tour },
//   });
// });

// exports.deleteTour  = catchAsync(async (req, res, next) => {
//   //restfully api commonly to not send any data back to the client
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('No tour has found with that ID', 404));
//   }
//   res.status(200).json({ status: 'success', data: null });
// });
*/
/*

exports.getAllTours = async (req, res, next) => {
try {
  // EXECUTE QUERY
  //[1]using filter object like mongosh
  const tours = await Tour.find(req.query);
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  //[2]using mongoose methods
  // const tours = await Tour.find()
  //   .where('duration')
  //   .lte(5)
  //   .where('difficulty')
  //   .equals('easy');
  const tours = await features.query;
  // SEND RES
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
} catch (error) {
  res.status(404).json({ status: 'fail', message: error });
}
};



exports.createTour = async (req, res, next) => {
try {
  // const newTour = new Tour({});
  // newTour.save(); // here we call the method on the instance (document)
  const newTour = await Tour.create(req.body); // here we call the method directly on the model
  res.status(201).json({ status: 'success', data: { tour: newTour } }); //201 stands for created
} catch (error) {
  res.status(400).json({ status: 'fail', message: error.message });
}
};



exports.getTour = async (req, res) => {
  try {
    const specificTour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id}) //mongo itself

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { tour: specificTour },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};




exports.updateTour = async (req, res) => {
  try {
    const specificTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { tour: specificTour },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};


exports.deleteTour = async (req, res) => {
  try {
    //restfully api commonly to not send any data back to the client
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: null });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error.message });
  }
};





exports.getTourStats = async (req, res) => {
  try {
    // we manipulate data in steps ... we pass in an array of so-called stages
    // group allows as to group documents together using accumulator
    // model.find() returns query   .....   model.aggregate() returns aggregation object

    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        //allows us to group docs together using an acculmlator>> using _id prop
        $group: {
          // _id: null, //what we want group by and null because we want every thing in one group
          _id: { $toUpper: '$difficulty' },
          // _id: '$ratingsAverage',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      //het we just have these fields {numRatings,..} the core fields are gone you can only use the fields and valus of prev stage
      { $sort: { avgRating: 1 } }, //1for assending
      // { $match: { _id: { $ne: 'EASY' } } },
      // { $match: { numRatings: { $ne: 41 } } },
    ]);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { stats },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};


*/
