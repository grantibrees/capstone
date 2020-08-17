import express from "express";
import BaseController from "../utils/BaseController";
import { valuesService } from "../services/ValuesService";
import auth0provider from "@bcwdev/auth0provider";
import { sessionsService } from '../services/SessionsService'

export class SessionssController extends BaseController {
  constructor() {
    super("api/session");
    this.router
      .use(auth0provider.isAuthorized)
      .get("/:sessionCode", this.getBySessionCode)
      .post("", this.create)
      .put("/:sessionCode", this.addToQueue)
  }
  async getBySessionCode(req, res, next) {
    try {
      let data = await sessionsService.getById(req.params.sessionCode)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email
      let data = await sessionsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error); }
  }

  async addToQueue(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await sessionsService.addToQueue(req.params.sessionCode, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }
