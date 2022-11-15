const { Clients } = require("../models");

class ClientsRepository {
  // 고객사 전체 조회
  getAllClients = async () => {
    const clients = await Clients.findAll({ order: [["clientId", "ASC"]] });
    return clients;
  };

  // 고객사 생성
  createClient = async (client, accessNo) => {
    const createClient = await Clients.create({ client, accessNo });
    return createClient;
  };

  // clientId에 해당하는 고객사 불러옴
  getClientDetail = async (clientId) => {
    const thisClient = await Clients.findOne({ where: { clientId } });
    return thisClient;
  };

  // clientId에 해당하는 고객사 수정
  updateClient = async (clientId, client, accessNo) => {
    const updateClient = await Clients.update({ client, accessNo }, { where: { clientId } });
    return updateClient;
  };

  // clientId에 해당하는 고객사 삭제
  deleteClient = async (clientId) => {
    const deleteClient = await Clients.destroy({ where: { clientId } });
    return deleteClient;
  };
}

module.exports = ClientsRepository;
