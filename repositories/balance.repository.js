const { Balances } = require("../models");

class BalanceRepository {
  // clientId에 해당하는 클라이언트의 모든 적립금 내역을 불러옴
  getAllBalancesOnClientId = async (clientId) => {
    const balances = await Balances.findAll({ where: { clientId }, order: [["balanceId", "ASC"]] });
    return balances;
  };

  // clientId에 해당하는 클라이언트에 적립금 추가
  addBalance = async (clientId, date, content, in_charge, amount) => {
    const addBalance = await Balances.create({
      clientId,
      date,
      content,
      in_charge,
      amount,
    });
    return addBalance;
  };

  // balanceId에 해당하는 적립금 내역 불러옴
  getBalanceDetail = async (balanceId) => {
    const thisBalance = await Balances.findOne({ where: { balanceId } });
    return thisBalance;
  };

  // balanceId에 해당하는 적립금 내역 수정
  updateBalance = async (balanceId, date, content, in_charge, amount) => {
    const updateBalance = await Balances.update({ date, content, in_charge, amount }, { where: { balanceId } });
    return updateBalance;
  };

  // balanceId에 해당하는 적립금 내역 삭제
  deleteBalance = async (balanceId) => {
    const deleteBalance = await Balances.destroy({ where: { balanceId } });
    return deleteBalance;
  };
}

module.exports = BalanceRepository;
