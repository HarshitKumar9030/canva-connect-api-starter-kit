import express from "express";
import { DesignService } from "@canva/connect-api-ts/ts/services.gen";
import type { CreateDesignRequest } from "@canva/connect-api-ts";

const router = express.Router();

const endpoints = {
  DESIGNS: "/designs",
  GETDESIGN: "/getdesign/:designId"
};

router.post(endpoints.DESIGNS, async (req, res) => {
  const requestBody: CreateDesignRequest = req.body;
  const result = await DesignService.createDesign({
    client: req.client,
    body: requestBody,
  });
  if (result.error) {
    console.log(result.error);
    return res.status(result.response.status).json(result.error);
  }

  return res.json(result.data);
});

router.get(endpoints.GETDESIGN, async (req, res) => {
  const result = await DesignService.getDesign({
    cache: "no-store",
    client: req.client,
    path: {
      designId: req.params.designId,
    }
  });
  if (result.error) {
    console.log(result.error);
    return res.status(result.response.status).json(result.error);
  }

  return res.json(result.data?.design);
})

export default router;
