const express = require('express');
const router = express.Router();


router.post("/", async (req, res) => {
    const x = req.body;
  
    var com = `${x.commits
      .map((m) => {
        return m.message + " ";
      })
      .join("\n")}`;
  
    //${x.commits.map((m)=>{return m.message}).join("")}`
    //   var text_msg = `Repository Name ${x.repository.name}
    //         Repository Owner ${x.repository.owner.name}
    //         Pusher Name ${x.pusher.name}`;
  
    var text_msg = `
          <strong>Repostitory: </strong> <em>${x.repository.name}</em>
          <strong>Owner: </strong> <em>${x.repository.owner.name}</em>
          <strong>Pushed by: </strong> <em>${x.pusher.name}</em>
          <strong>Commit: </strong><em>${com}</em>`;
  
    const data = {
      chat_id: `${process.env.CHAT_ID}`,
      text: text_msg,
      parse_mode: "HTML",
    };
    const some = await axios.post(
      `https://api.telegram.org/bot${process.env.AUTH_TOKEN}/sendMessage`,
      data
    );
    var imgdata = {
      chat_id: `${process.env.CHAT_ID}`,
      photo: x.repository.owner.avatar_url,
      caption: x.repository.owner.name,
    };
    await axios.post(
      `https://api.telegram.org/bot${process.env.AUTH_TOKEN}/sendPhoto`,
      imgdata
    );
  
    res.send({ status: "ok" });
  });


module.exports = router;