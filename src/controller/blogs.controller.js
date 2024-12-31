const getAllBlogs = (req, res) => {
  const userD = req.body;

  console.log();
  res.send(`Name: ${userD.name}`);
};

module.exports = { getAllBlogs };
