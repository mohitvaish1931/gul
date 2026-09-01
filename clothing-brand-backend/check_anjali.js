import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://wscubetech299_db_user:mohitl%401931@cluster0.qgfuuem.mongodb.net/?appName=Cluster0')
  .then(async () => {
    const db = mongoose.connection.db;
    const orders = await db.collection('orders').find({ 'shippingAddress.name': { $regex: /anjali/i } }).toArray();
    console.log(JSON.stringify(orders, null, 2));
    process.exit(0);
  });
