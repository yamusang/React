import express, { json } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(json()); 

const MONGODB_URI = "mongodb://localhost:27017";
const DB_NAME = "react01";
const COLLECTION_NAME = "box";


let db;
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    console.log("MongdDB 연결 성공!!!");
   
  })
  .catch((error) => console.error("MongoDB 연결 실패:", error));


app.get("/api/box", async (req, res) => {
  
  try {
    const box = await db.collection(COLLECTION_NAME).find({}).toArray();
    res.json(box); 
  } catch (error) {
    
    res.status(500).json({ error: "서버오류-데이터 조회 실패" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const todoId = Number(req.params.id)
    const {checked} = req.body 
    const result = await db.collection(COLLECTION_NAME).updateOne(
        {id:todoId},
        {
            $set:{
                checked:checked
            }
        }
    )
    console.log(result)
    if(result.matchedCount ===0 ){
        return res.status(404).json({error:"지정된 id를 찾을 수 없습니다.!!"})
    }


    res.json({message:"checked 업데이트 완료!!"})
  } catch (error) {
    res.status(500).json({ error: "서버오류-데이터 checked 수정 실패" });
  }
});

app.delete('/api/todos/:id',async(req,res)=>{
    try {
        const todoId = Number(req.params.id)
        const result = await db.collection(COLLECTION_NAME).deleteOne({id:todoId})
        console.log(result)
        if(result.deletedCount ===0 ){
        return res.status(404).json({error:"지정된 id를 찾을 수 없습니다.!!"})
    }

        res.json({message:"삭제 성공!!"})
    } catch (error) {
    res.status(500).json({ error: "서버오류-데이터 삭제 실패" });
  }
})

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
