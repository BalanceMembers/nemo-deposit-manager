const ClientsRepository = require("../repositories/clients.repository");

class ClientsService {
  clientsRepository = new ClientsRepository();

  // 고객사 전체 조회
  getAllClients = async (req, res) => {
    try {
      const data = await this.clientsRepository.getAllClients();
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({ success: false, errorMessage: "클라이언트 구좌 조회에 실패하였습니다." });
    }
  };

  // 고객사 생성
  createClient = async (req, res) => {
    try {
      const { client, accessNo } = req.body;

      if (!client || !accessNo) {
        res.status(400).json({ success: false, message: "누락된 항목이 있습니다." });
        return;
      }

      const data = await this.clientsRepository.createClient(client, accessNo);
      res.status(201).json({ success: true, message: "클라이언트 구좌 생성이 완료되었습니다.", data });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({ success: false, errorMessage: "클라이언트 구좌 생성에 실패하였습니다." });
    }
  };

  // 고객사 수정
  updateClient = async (req, res) => {
    try {
      const { clientId } = req.params;
      const { client, accessNo } = req.body;

      const clientToUpdate = await this.clientsRepository.getClientDetail(clientId);

      if (!clientToUpdate) {
        return res.status(404).json({ success: false, errorMessage: "해당 클라이언트 구좌가 없습니다." });
      }

      if (!client || !accessNo) {
        res.status(400).json({ success: false, message: "누락된 항목이 있습니다." });
        return;
      }

      await this.clientsRepository.updateClient(clientId, client, accessNo);
      res.status(200).json({ success: true, message: "클라이언트 구좌 수정이 완료되었습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({ success: false, errorMessage: "클라이언트 구좌 수정에 실패하였습니다." });
    }
  };

  // 고객사 삭제
  deleteClient = async (req, res) => {
    try {
      const { clientId } = req.params;

      const clientToDelete = await this.clientsRepository.getClientDetail(clientId);

      if (!clientToDelete) {
        return res.status(404).json({ success: false, errorMessage: "해당 클라이언트 구좌가 없습니다." });
      }

      await this.clientsRepository.deleteClient(clientId);
      res.status(200).json({ success: true, message: "클라이언트 구좌 삭제가 완료되었습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({ success: false, errorMessage: "클라이언트 구좌 삭제에 실패하였습니다." });
    }
  };
}

module.exports = ClientsService;
