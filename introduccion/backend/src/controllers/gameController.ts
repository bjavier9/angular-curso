import {Request, Response} from 'express';
import pool from '../database'; 

class GameController{
   public async list(req:Request, res:Response): Promise<void>{
    await pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * from games', (error, results, fields)=> {        
          connection.release();       
          if (error) throw error;
            res.json(results);         
        });
        // pool.end(function (err) {if (err) throw err});
        
      });
    }
    public async getOne(req:Request, res:Response):Promise<void>{
        const{id}=req.params;
        const game = await pool.query('SELECT * FROM games where id=?',[id],(err, results)=>{
            if(err)throw err;
            res.json(results[0])
        })
        
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO games set ?', [req.body],function (error, results, fields) {
            if (error) throw error;
            res.json({"message":"Se inserto con exito: "+results.insertId})
          });
      
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id],function (error, results, fields) {
            if (error) throw error;
            res.json({"message":"Se inserto con exito: "+results.insertId})
          });
        
    }
    public async delete(req: Request, res:Response): Promise<void> {
        const{id}=req.params;
        const game = await pool.query('DELETE FROM games where id=?',[id],(err, results)=>{
            if(err)throw err;
            res.json({message:"Se borro con exito"})
        })
    }
}
const gameController = new GameController();
export default gameController; 