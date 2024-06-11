// controllers/rewards.js

const earnPoints = (req, res) => {
    const { points } = req.body; 
  
    User.findById(req.user.id)
      .then(user => {
        user.points += points;
        return user.save();
      })
      .then(() => {
        res.status(200).json({ message: `Earned ${points} points successfully.` });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };
  
  const redeemPoints = (req, res) => {
    const { points } = req.body; 
  
    User.findById(req.user.id)
      .then(user => {
        if (user.points < points) {
          return res.status(400).json({ message: "Insufficient points." });
        }
        user.points -= points;
        return user.save();
      })
      .then(() => {
        res.status(200).json({ message: `Redeemed ${points} points successfully.` });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };
  
  module.exports = { earnPoints, redeemPoints };
  