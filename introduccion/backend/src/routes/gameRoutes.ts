import {Router} from 'express';
import gameController from '../controllers/gameController';
class gameRoutes{
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void{
        this.router.get('/',gameController.list);
        this.router.get('/:id',gameController.getOne);
        this.router.post('/', gameController.create);
        this.router.delete('/:id',gameController.delete);
        this.router.put('/:id',gameController.update);
    }
}

const gamesRoutes = new gameRoutes();
export default gamesRoutes.router;