import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import ILogin from '../interfaces/ILogin.interfaces';
import User from '../database/models/User';
import Jwt from '../helpers/jwt';
import Bycrypt from '../helpers/bcrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests login', async () => {
  describe('200 ok', () => {

    const loginMock: ILogin = {
      email: "admin@admin.com",
      password: "secret_admin" 
    }

    afterEach(() => { sinon.restore() })

    it('should return a token', async () => {
      sinon.stub(Bycrypt, 'checkPassword');
      sinon.stub(User, 'findOne').resolves(loginMock as User)
      sinon.stub(Jwt, 'createToken').returns('token');

      const response = await chai.request(app).post('/login').send(loginMock)
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({token: 'token'})
    });
  })

});