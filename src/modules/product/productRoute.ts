import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/userConstant';
import { productController } from './productController';

const router = Router();

router.post('/create', auth(USER_ROLE.admin), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.patch(
    '/:productId',
    auth(USER_ROLE.admin),
    productController.updateProduct,
);
router.delete(
    '/:productId',
    auth(USER_ROLE.admin),
    productController.deleteProduct,
);

export const productRoutes = router;
