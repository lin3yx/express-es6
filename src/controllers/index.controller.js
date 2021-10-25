const welcome = (req, res) => {
  res.status(200).json({ msg: 'Welcome to the API' });
};

const getAll = (req, res) => {
  res.status(200).json({ msg: 'Get all' });
};

export { welcome, getAll };
