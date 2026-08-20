import {  beforeEach, expect, test, describe } from 'vitest'
import { CustomerController } from './customer.controller';



describe('customerController', () => {
let customerController: CustomerController;


  beforeEach(() => {
    customerController = new CustomerController()
  })


  test('should create a customer', () => {
    expect(customerController.create()).toBe('hello world')
  })
})