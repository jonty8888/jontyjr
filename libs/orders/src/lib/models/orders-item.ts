/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {Product} from '../../../../products/src/lib/models/product'
import { Category } from 'libs/products/src/lib/models/category';

export class OrderItem {
    product?: any;
    quantity?: number;
  }
  