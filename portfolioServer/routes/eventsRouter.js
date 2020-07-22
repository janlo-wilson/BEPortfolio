const express = require("express");
const bodyParser = require("body-parser");
const Event = require("../models/events");
const { response } = require("express");
const EventType = require("../models/eventTypes");
const authenticate = require('../authenticate');

const eventsRouter = express.Router();

eventsRouter.use(bodyParser.json());

eventsRouter
  .route("/")
  .get((req, res, next) => {
    Event.find()
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(
          {
            Arts: "Live theater, musicals/plays, exhibition openings, festivals, lectures, and more.", 
            Music: "Concerts, open mic nights, symphonies, festivals, and more.",
            Sports: "Local minor league sports, surfing competitions, roller derby, guided hikes, and more.",
            Volunteer: "Looking for a way to help out your community this weekend? Find it here!"
          }
          );
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /events");
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /events");
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /events");
  });

eventsRouter.route("/arts")
.get((req, res, next) => {
  EventType.find()
    .then((events) => {
      let arts = events.filter(function(x) {
        return x.eventType == "Arts"});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(arts);
    })
    .catch((err) => next(err));
})
.post(
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    EventType.create(req.body)
      .then((event) => {
        console.log("Event Created:", event);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  }
)
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("PUT operation not supported on /events/arts");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
      .then((events) => {
        let arts = events.filter(function(x) {
        return x.eventType == "Arts"});
        var myquery = { _id: { $in: arts } };
        EventType.deleteMany(myquery).then((events) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(events); 
        }).catch((err) => next(err));
      }).catch((err) => next(err));
    }
  );

eventsRouter
  .route("/arts/:artId")
  .get((req, res, next) => {
    EventType.findById(req.params.artId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /events/arts/${req.params.artId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(
      req.params.artId,
    )
      .then((event) => {
        if (req.verifyUser == true)
        {
          if (!event) {
            err = new Error(`${req.params.artId} not found`);
            err.status = 404;
            return next(err);
          } 
          if (req.body.artId == null) {
            err = new Error(`${req.body.artId} not found`);
            err.status = 404;
            return next(err);
          }
        }
        else if (event && event.artId == req.body.artId) {
          event.featured = req.body.featured;
        
          event
            .save()
            .then((event) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(event);
            })
            .catch((err) => next(err));
        }
      })
    .catch((err) => next(err));
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /events/arts/${req.params.artId}`);
  });

  eventsRouter.route("/music")
  .get((req, res, next) => {
    console.log("das music");
    EventType.find()
      .then((events) => {
        let music = events.filter(function(x) {
          return x.eventType == "Music"});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(music);
      })
      .catch((err) => next(err));
  })
  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.create(req.body)
        .then((event) => {
          console.log("Event Created:", event);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        })
        .catch((err) => next(err));
    }
  )
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /events/music");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
      .then((events) => {
        let music = events.filter(function(x) {
        return x.eventType == "Music"});
        var myquery = { _id: { $in: music } };
        EventType.deleteMany(myquery).then((events) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(events); 
        }).catch((err) => next(err));
      }).catch((err) => next(err));
    }
  );

eventsRouter
  .route("/music/:musicId")
  .get((req, res, next) => {
    EventType.findById(req.params.musicId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /events/music/${req.params.musicId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(
      req.params.musicId,
    )
      .then((event) => {
        if (req.verifyUser == true)
        {
          if (!event) {
            err = new Error(`${req.params.musicId} not found`);
            err.status = 404;
            return next(err);
          } 
          if (req.body.musicId == null) {
            err = new Error(`${req.body.musicId} not found`);
            err.status = 404;
            return next(err);
          }
        }
        else if (event && event.musicId == req.body.musicId) {
          event.featured = req.body.featured;
        
          event
            .save()
            .then((event) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(event);
            })
            .catch((err) => next(err));
        }
      })
    .catch((err) => next(err));
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /events/arts/${req.params.musicId}`);
  });

  eventsRouter.route("/sports")
  .get((req, res, next) => {
    console.log("das sports");
    EventType.find()
      .then((events) => {
        let sports = events.filter(function(x) {
          return x.eventType == "Sports"});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(sports);
      })
      .catch((err) => next(err));
  })
  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.create(req.body)
        .then((event) => {
          console.log("Event Created:", event);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        })
        .catch((err) => next(err));
    }
  )
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("PUT operation not supported on /events/sport");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
      .then((events) => {
        let sports = events.filter(function(x) {
        return x.eventType == "Sports"});
        var myquery = { _id: { $in: sports } };
        EventType.deleteMany(myquery).then((events) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(events); 
        }).catch((err) => next(err));
      }).catch((err) => next(err));
    }
  );

eventsRouter
  .route("/sports/:sportId")
  .get((req, res, next) => {
    EventType.findById(req.params.sportId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /events/sport/${req.params.sportId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(
      req.params.sportId,
    )
      .then((event) => {
        if (req.verifyUser == true)
        {
          if (!event) {
            err = new Error(`${req.params.sportId} not found`);
            err.status = 404;
            return next(err);
          } 
          if (req.body.sportId == null) {
            err = new Error(`${req.body.sportId} not found`);
            err.status = 404;
            return next(err);
          }
        }
        else if (event && event.sportId == req.body.sportId) {
          event.featured = req.body.featured;
        
          event
            .save()
            .then((event) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(event);
            })
            .catch((err) => next(err));
        }
      })
    .catch((err) => next(err));
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /events/arts/${req.params.sportId}`);
  });

  eventsRouter.route("/volunteer")
  .get((req, res, next) => {
    EventType.find()
      .then((events) => {
        let volunteer = events.filter(function(x) {
          return x.eventType == "Volunteer"});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(volunteer);
      })
      .catch((err) => next(err));
  })
  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.create(req.body)
        .then((event) => {
          console.log("Event Created:", event);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(event);
        })
        .catch((err) => next(err));
    }
  )
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("PUT operation not supported on /events/volunteer");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
      .then((events) => {
        let volunteer = events.filter(function(x) {
        return x.eventType == "Volunteer"});
        var myquery = { _id: { $in: volunteer } };
        EventType.deleteMany(myquery).then((events) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(events); 
        }).catch((err) => next(err));
      }).catch((err) => next(err));
    }
  );

eventsRouter
  .route("/volunteer/:volunteerId")
  .get((req, res, next) => {
    EventType.findById(req.params.volunteerId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /events/volunteer/${req.params.volunteerId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(
      req.params.volunteerId,
    )
      .then((event) => {
        if (req.verifyUser == true)
        {
          if (!event) {
            err = new Error(`${req.params.volunteerId} not found`);
            err.status = 404;
            return next(err);
          } 
          if (req.body.volunteerId == null) {
            err = new Error(`${req.body.volunteerId} not found`);
            err.status = 404;
            return next(err);
          }
        }
        else if (event && event.volunteerId == req.body.volunteerId) {
          event.featured = req.body.featured;
        
          event
            .save()
            .then((event) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(event);
            })
            .catch((err) => next(err));
        }
      })
    .catch((err) => next(err));
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /events/arts/${req.params.volunteerId}`);
  });

module.exports = eventsRouter;

/*

campsiteRouter.route('/:campsiteId/comments')
    .get((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite.comments);
                } else {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite) {
                    campsite.comments.push(req.body);
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
    })
    .delete((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite) {
                    for (let i = (campsite.comments.length - 1); i >= 0; i--) {
                        campsite.comments.id(campsite.comments[i]._id).remove();
                    }
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });

campsiteRouter.route('/:campsiteId/comments/:commentId')
    .get((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite && campsite.comments.id(req.params.commentId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite.comments.id(req.params.commentId));
                } else if (!campsite) {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
    })
    .put((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite && campsite.comments.id(req.params.commentId)) {
                    if (req.body.rating) {
                        campsite.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.text) {
                        campsite.comments.id(req.params.commentId).text = req.body.text;
                    }
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else if (!campsite) {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                if (campsite && campsite.comments.id(req.params.commentId)) {
                    campsite.comments.id(req.params.commentId).remove();
                    campsite.save()
                        .then(campsite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(campsite);
                        })
                        .catch(err => next(err));
                } else if (!campsite) {
                    err = new Error(`Campsite ${req.params.campsiteId} not found`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });

module.exports = campsiteRouter; */
