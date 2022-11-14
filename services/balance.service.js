const BalanceRepository = require("../repositories/balance.repository");

class BalanceService {
  balanceRepository = new BalanceRepository();

  // 특정 클라이언트 적립금 내역 보기
  getBalancesOn = async (req, res) => {
    try {
      const { clientId } = req.params;
      const data = await this.balanceRepository.getAllBalancesOnClientId(clientId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      res.status(400).json({ success: false, errorMessage: "적립금 내역 조회에 실패하였습니다." });
    }
  };

  // 특정 클라이언트 적립금 내역 추가
  addBalanceOn = async (req, res) => {
    try {
      const { clientId } = req.params;
      const { date, content, in_charge, amount } = req.body;

      if (!date || !content || !in_charge || !amount) {
        res.status(400).json({ success: false, message: "누락된 항목이 있습니다." });
        return;
      }

      await this.balanceRepository.addBalance(date, content, in_charge, amount);
      res.status(201).json({ success: true, message: "적립금 내역을 추가하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      res.status(400).json({ success: false, errorMessage: "적립금 내역 추가에 실패하였습니다." });
    }
  };

  // 특정 ID의 적립금내역 수정
  updateBalance = async (req, res) => {
    try {
      const { balanceId } = req.params;
      const { date, content, in_charge, amount } = req.body;

      const balanceToUpdate = await this.balanceRepository.getBalanceDetail(balanceId);

      if (!balanceToUpdate) {
        res.status(404).json({ success: false, errorMessage: "해당 내역이 없습니다." });
        return;
      }

      if (!date || !content || !in_charge || !amount) {
        res.status(400).json({ success: false, message: "누락된 항목이 있습니다." });
        return;
      }

      await this.balanceRepository.updateBalance(balanceId, date, content, in_charge, amount);
      res.status(200).json({ success: true, message: "적립금 내역을 수정하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      res.status(400).json({ success: false, errorMessage: "적립금 내역 수정에 실패하였습니다." });
    }
  };

  // 특정 ID의 적립금내역 삭제
  deleteBalance = async (req, res) => {
    try {
      const { balanceId } = req.params;

      const balanceToDelete = await this.balanceRepository.getBalanceDetail(balanceId);

      if (!balanceToDelete) {
        res.status(404).json({ success: false, errorMessage: "해당 내역이 없습니다." });
        return;
      }

      await this.balanceRepository.deleteBalance(balanceId);
      res.status(200).json({ success: true, message: "적립금 내역을 삭제하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      res.status(400).json({ success: false, errorMessage: "적립금 내역 삭제에 실패하였습니다." });
    }
  };
}

module.exports = BalanceService;
