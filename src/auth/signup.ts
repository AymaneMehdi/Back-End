router.post('/signup', async (req, res) => {
  const { name, email, password, scope } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const user = new User({ name, email, password: hashedPassword, scope });
  await user.save();
  
  const token = jwt.sign({ id: user._id, scope: user.scope }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});
