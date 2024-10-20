import mongodb from 'mongodb';
import dotenv from'dotenv';

dotenv.config();

const DBName = process.env.DB_NAME;
const cloudURL = `mongodb+srv://${process.env.DB_USERID}:${process.env.DB_PASSWORD}@cluster0.2uuv1.mongodb.net/`

export const client = new mongodb.MongoClient(cloudURL); 

export const db = client.db(DBName);

export const ConnectToDB = async ()=>{
    try{
        await client.connect();
        console.log("DB Connected");
    }catch(e){
        console.log("Error:",e);
        process.exit();
    }
}
