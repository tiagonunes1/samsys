import axios from "axios";
import { ClientDTO } from "../models/client/clientDTO";
import { ClientEditDTO } from "../models/client/clientEditDTO";
import { MessagingHelper } from "../models/helper/messagingHelper";

var apiBaseUrl = process.env.REACT_APP_API_URL;
export class ClientService {
  async Get(id: number): Promise<MessagingHelper<ClientDTO | null>> {
    try {
      const result = await axios.get(`${apiBaseUrl}client/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro inesperado ao obter o cliente",
        null
      );
    }
  }

  async Update(
    id: number,
    dto: ClientEditDTO
  ): Promise<MessagingHelper<ClientDTO | null>> {
    try {
      const result = await axios.put(
        `${apiBaseUrl}client/${id}`,
        {
          ...dto,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro inesperado ao atualizar o cliente",
        null
      );
    }
  }
  async GetAll(): Promise<MessagingHelper<ClientDTO[] | null>> {
    try {
      const result = await axios.get(`${apiBaseUrl}client`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro inesperado ao obter todos os clientes",
        null
      );
    }
  }
  async Create(
    clientData: ClientCreateDTO
  ): Promise<MessagingHelper<ClientCreateDTO | null>> {
    try {
      console.log("Request Payload:", clientData);
      if (clientData.dateBirth === "") {
        clientData.dateBirth = "1900-01-01";
      }
      const result = await axios.post(
        `${apiBaseUrl}client/create`,
        {
          ...clientData,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro ao criar o cliente",
        null
      );
    }
  }

  async getAllClients(): Promise<MessagingHelper<ClientDTO[]>> {
    try {
      const result = await axios.get(`${apiBaseUrl}client/getAll`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro inesperado ao obter os clientes",
        null
      );
    }
  }

  async Enable(id: number): Promise<MessagingHelper<null>> {
    try {
      const result = await axios.post(
        `${apiBaseUrl}client/${id}/Enable`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro inesperado ao ativar o cliente",
        null
      );
    }
  }

  async Disable(id: number): Promise<MessagingHelper<null>> {
    try {
      const result = await axios.post(
        `${apiBaseUrl}client/${id}/Disable`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return result.data;
    } catch (ex) {
      return new MessagingHelper<null>(
        false,
        "Ocorreu um erro inesperado ao desativar o cliente",
        null
      );
    }
  }
}
