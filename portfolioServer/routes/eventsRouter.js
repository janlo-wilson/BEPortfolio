const express = require("express");
const bodyParser = require("body-parser");
const Event = require("../models/events");
const { response } = require("express");
const EventType = require("../models/eventTypes");
const authenticate = require("../authenticate");
const cors = require("./cors");

const eventsRouter = express.Router();

eventsRouter.use(bodyParser.json());

eventsRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Event.find()
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          Arts:
            "Live theater, musicals/plays, exhibition openings, festivals, lectures, and more.",
          Music: "Concerts, open mic nights, symphonies, festivals, and more.",
          Sports:
            "Local minor league sports, surfing competitions, roller derby, guided hikes, and more.",
          Volunteer:
            "Looking for a way to help out your community this weekend? Find it here!",
        });
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("POST operation not supported on /events");
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /events");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("DELETE operation not supported on /events");
    }
  );

eventsRouter
  .route("/arts")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.find()
      .then((events) => {
        let arts = events.filter(function (x) {
          return x.eventType == "Arts";
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(arts);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
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
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end("PUT operation not supported on /events/arts");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
        .then((events) => {
          let arts = events.filter(function (x) {
            return x.eventType == "Arts";
          });
          var myquery = { _id: { $in: arts } };
          EventType.deleteMany(myquery)
            .then((events) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(events);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

eventsRouter
  .route("/arts/:artId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.findById(req.params.artId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.artId)
    .then((event) => {
      if (req.verifyAdmin == true) {
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
        if (req.body.name) {
          event.name = req.body.name;
        }
        if (req.body.image) {
          event.image = req.body.image;
        }
        if (req.body.date) {
          event.date = req.body.date;
        }
        if (req.body.time) {
          event.time = req.body.time;
        }
        if (req.body.fragment) {
          event.fragment = req.body.fragment;
        }
        if (req.body.url) {
          event.url = req.body.url;
        }
        if (req.body.featured != null) {
          event.featured = req.body.featured;
        }
        if (req.body.eventType) {
          event.eventType = req.body.eventType;
        }

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
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.artId)
    .then((event) => {
      if (req.verifyUser == true) {
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
.delete(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    EventType.findByIdAndDelete(req.params.artId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  }
);

eventsRouter
  .route("/music")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.find()
      .then((events) => {
        let music = events.filter(function (x) {
          return x.eventType == "Music";
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(music);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
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
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /events/music");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
        .then((events) => {
          let music = events.filter(function (x) {
            return x.eventType == "Music";
          });
          var myquery = { _id: { $in: music } };
          EventType.deleteMany(myquery)
            .then((events) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(events);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

eventsRouter
  .route("/music/:musicId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.findById(req.params.musicId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.musicId)
    .then((event) => {
      if (req.verifyAdmin == true) {
        if (!event) {
          err = new Error(`${req.params.musicId} not found`);
          err.status = 404;
          return next(err);
        }
        if (req.body.artId == null) {
          err = new Error(`${req.body.musicId} not found`);
          err.status = 404;
          return next(err);
        }
      } 
      else if (event && event.musicId == req.body.musicId) {
        if (req.body.name) {
          event.name = req.body.name;
        }
        if (req.body.image) {
          event.image = req.body.image;
        }
        if (req.body.date) {
          event.date = req.body.date;
        }
        if (req.body.time) {
          event.time = req.body.time;
        }
        if (req.body.fragment) {
          event.fragment = req.body.fragment;
        }
        if (req.body.url) {
          event.url = req.body.url;
        }
        if (req.body.featured != null) {
          event.featured = req.body.featured;
        }
        if (req.body.eventType) {
          event.eventType = req.body.eventType;
        }

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
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.musicId)
      .then((event) => {
        if (req.verifyUser == true) {
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
        } else if (event && event.musicId == req.body.musicId) {
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
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.findByIdAndDelete(req.params.musicId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

eventsRouter
  .route("/sports")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    console.log("das sports");
    EventType.find()
      .then((events) => {
        let sports = events.filter(function (x) {
          return x.eventType == "Sports";
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(sports);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
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
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end("PUT operation not supported on /events/sport");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
        .then((events) => {
          let sports = events.filter(function (x) {
            return x.eventType == "Sports";
          });
          var myquery = { _id: { $in: sports } };
          EventType.deleteMany(myquery)
            .then((events) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(events);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

eventsRouter
  .route("/sports/:sportId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.findById(req.params.sportId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.sportId)
    .then((event) => {
      if (req.verifyAdmin == true) {
        if (!event) {
          err = new Error(`${req.params.sportId} not found`);
          err.status = 404;
          return next(err);
        }
        if (req.body.artId == null) {
          err = new Error(`${req.body.sportId} not found`);
          err.status = 404;
          return next(err);
        }
      } 
      else if (event && event.sportId == req.body.sportId) {
        if (req.body.name) {
          event.name = req.body.name;
        }
        if (req.body.image) {
          event.image = req.body.image;
        }
        if (req.body.date) {
          event.date = req.body.date;
        }
        if (req.body.time) {
          event.time = req.body.time;
        }
        if (req.body.fragment) {
          event.fragment = req.body.fragment;
        }
        if (req.body.url) {
          event.url = req.body.url;
        }
        if (req.body.featured != null) {
          event.featured = req.body.featured;
        }
        if (req.body.eventType) {
          event.eventType = req.body.eventType;
        }

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
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.sportId)
      .then((event) => {
        if (req.verifyUser == true) {
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
        } else if (event && event.sportId == req.body.sportId) {
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
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.findByIdAndDelete(req.params.sportId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

eventsRouter
  .route("/volunteer")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.find()
      .then((events) => {
        let volunteer = events.filter(function (x) {
          return x.eventType == "Volunteer";
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(volunteer);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
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
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end("PUT operation not supported on /events/volunteer");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.find()
        .then((events) => {
          let volunteer = events.filter(function (x) {
            return x.eventType == "Volunteer";
          });
          var myquery = { _id: { $in: volunteer } };
          EventType.deleteMany(myquery)
            .then((events) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(events);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

eventsRouter
  .route("/volunteer/:volunteerId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    EventType.findById(req.params.volunteerId)
      .then((event) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(event);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.volunteerId)
    .then((event) => {
      if (req.verifyAdmin == true) {
        if (!event) {
          err = new Error(`${req.params.volunteerId} not found`);
          err.status = 404;
          return next(err);
        }
        if (req.body.artId == null) {
          err = new Error(`${req.body.volunteerId} not found`);
          err.status = 404;
          return next(err);
        }
      } 
      else if (event && event.volunteerId == req.body.volunteerId) {
        if (req.body.name) {
          event.name = req.body.name;
        }
        if (req.body.image) {
          event.image = req.body.image;
        }
        if (req.body.date) {
          event.date = req.body.date;
        }
        if (req.body.time) {
          event.time = req.body.time;
        }
        if (req.body.fragment) {
          event.fragment = req.body.fragment;
        }
        if (req.body.url) {
          event.url = req.body.url;
        }
        if (req.body.featured != null) {
          event.featured = req.body.featured;
        }
        if (req.body.eventType) {
          event.eventType = req.body.eventType;
        }

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
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    EventType.findByIdAndUpdate(req.params.volunteerId)
      .then((event) => {
        if (req.verifyUser == true) {
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
        } else if (event && event.volunteerId == req.body.volunteerId) {
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
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      EventType.findByIdAndDelete(req.params.volunteerId)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

module.exports = eventsRouter;
