import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";

const ListClients = () => {
  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientService = new ClientService();
      const resultGetClients = await clientService.getAllClients();

      console.log("Resultado do backend:", resultGetClients);

      if (Array.isArray(resultGetClients)) {
        setClients(resultGetClients);
      } else {
        setErrorMessage(resultGetClients || "Erro ao obter os clientes.");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      setErrorMessage("Ocorreu um erro ao obter os clientes. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToEdit = (clientId: number) => {
    navigate(`/client/edit/${clientId}`);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Row>
          <Col xl={12}>
            <h1>Lista de Clientes</h1>
          </Col>
        </Row>
      </div>

      <div style={{ width: "100%", marginTop: "2em" }}>
        {loading && <p>Loading...</p>}

        {errorMessage && (
          <Row>
            <Col xl={12} className="error">
              {errorMessage}
            </Col>
          </Row>
        )}

        {!loading && !errorMessage && (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contacto</th>
                <th>Data de Nascimento</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.DateBirth}</td>
                  <td>
                    <button onClick={() => navigateToEdit(client.id)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ListClients;
