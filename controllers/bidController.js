const Bid = require('../models/bid');
const Util = require('../Util/Util');


const bid_add = (req, res) => {
    console.log(req.files);
    const bid = new Bid(req.body);
    bid.save()
        .then(result => {
            res.json({ status: 200,  msg: "Successfully palced a bid" });
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message })
            console.log(err);
        });
}


const bids = (req, res,) => {
    Bid.find().sort({ createdAt: -1 })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, msg: "No bid found" });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message  });
        });
}



const bid_by_ID = (req, res) => {
    Bid.find({ product_id : req.params.id })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, msg: "No bid found with given ID" });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message });
        });

};


const bid_delete = (req, res) => {

    Bid.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result != null && result.length != 0) 
                res.json({ status: 200,  msg: 'Bid deleted successfully'});
            else
            res.json({ status: 300, msg: "No bid found"});

        })
        .catch(err => {
            res.json({ status: 400,  msg: err.message});
            console.log(err);
        });
}


const bid_find_buyer = (req, res) => {

    console.log(req);

    Bid.findOne({ product_id: req.body.product_id, bid_amount: req.body.bid_amount }).then(result => {
      if (result != null && result.length != 0) {
        res.json({ status: 200, data: result });
      } else
        res.json({ status: 300, msg: "No bid found" });
    })
      .catch(err => {
        res.json({ status: 400, msg: err.message });
      });
  }
  
  
module.exports = {
    bid_add,
    bids,
    bid_by_ID,
    bid_delete,
    bid_find_buyer
};