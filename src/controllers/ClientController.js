const { Users, Balances, Clients } = require("../models");

class ClientController {
  //Client 조회
  getClient = async (req, res) => {
    try {
      const data = await Clients.findAll({ order: [["clientId", "ASC"]] });

      let returnArr = await Promise.all(
        data.map(async (e) => {
          const balanceSum = await Balances.sum("amount", {
            where: { clientId: e.clientId },
          });

          const userInfo = await Users.findOne({
            where: { userId: e.managerId },
          });

          return {
            clientId: e.clientId,
            clientName: e.clientName,
            id: userInfo.id,
            managerEmail: userInfo.email,
            managerTel: userInfo.telNum,
            balance: balanceSum,
            vat: balanceSum / 11,
          };
        })
      );
      res.status(200).json({ success: true, data: returnArr });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "클라이언트 조회에 실패하였습니다.",
      });
    }
  };

  //Client 생성
  createClient = async (req, res) => {
    try {
      const { clientName, managerId } = req.body;

      if (!clientName) {
        res
          .status(400)
          .json({ success: false, message: "회사명을 입력해주세요." });
        return;
      }

      await Clients.create({ clientName, managerId });

      const data = await Clients.findAll({
        order: [["clientId", "ASC"]],
      });

      let returnArr = await Promise.all(
        data.map(async (e) => {
          const balanceSum = await Balances.sum("amount", {
            where: { clientId: e.clientId },
          });

          const userInfo = await Users.findOne({
            where: { userId: e.managerId },
          });

          return {
            clientId: e.clientId,
            clientName: e.clientName,
            id: userInfo.id,
            managerEmail: userInfo.email,
            managerTel: userInfo.telNum,
            balance: balanceSum,
            vat: balanceSum / 11,
          };
        })
      );

      res.status(201).json({
        success: true,
        data: returnArr,
      });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "클라이언트 생성에 실패하였습니다.",
      });
    }
  };

  // 수정
  updateClient = async (req, res) => {
    try {
      const { clientId } = req.params;
      const { clientName, managerId } = req.body;
      const detailClient = await Clients.findOne({ where: { clientId } });

      if (!detailClient) {
        return res.status(404).json({
          success: false,
          errorMessage: "해당 클라이언트가 없습니다.",
        });
      }

      await Clients.update({ clientName, managerId }, { where: { clientId } });

      const data = await Clients.findAll({
        order: [["clientId", "ASC"]],
      });

      let returnArr = await Promise.all(
        data.map(async (e) => {
          const balanceSum = await Balances.sum("amount", {
            where: { clientId: e.clientId },
          });

          const userInfo = await Users.findOne({
            where: { userId: e.managerId },
          });

          return {
            clientId: e.clientId,
            clientName: e.clientName,
            id: userInfo.id,
            managerEmail: userInfo.email,
            managerTel: userInfo.telNum,
            balance: balanceSum,
            vat: balanceSum / 11,
          };
        })
      );

      res.status(201).json({
        success: true,
        data: returnArr,
      });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "클라이언트 수정에 실패하였습니다.",
      });
    }
  };

  // 삭제
  removeClient = async (req, res) => {
    try {
      const { clientId } = req.params;
      const detailClient = await Clients.findOne({ where: { clientId } });

      if (!detailClient) {
        return res.status(404).json({
          success: false,
          errorMessage: "해당 클라이언트가 없습니다.",
        });
      }

      await Clients.destroy({ where: { clientId } });
      res
        .status(200)
        .json({ success: true, message: "클라이언트를 삭제하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "클라이언트 삭제에 실패하였습니다.",
      });
    }
  };
}
module.exports = ClientController;
