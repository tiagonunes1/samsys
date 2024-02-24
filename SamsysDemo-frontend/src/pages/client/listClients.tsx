import { useState, useEffect } from "react";
import { Row, Col, Table } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";

export default function ListClients() {
    const [clients, setClients] = useState<ClientDTO[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const clientService = new ClientService();
            const resultGetClients: MessagingHelper<ClientDTO[]> = await clientService.getAllClients();

            if (resultGetClients.success) {
                setClients(resultGetClients.obj ?? []);
            } else {
                setErrorMessage(resultGetClients.message);
            }
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao obter os clientes. Tente novamente mais tarde.");
        }
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
                {errorMessage && (
                    <Row>
                        <Col xl={12} className="error">
                            {errorMessage}
                        </Col>
                    </Row>
                )}

                {successMessage && (
                    <Row>
                        <Col xl={12} className="success">
                            {successMessage}
                        </Col>
                    </Row>
                )}

                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Contacto</th>
                            <th>Data de Nascimento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.phoneNumber}</td>
                                <td>{client.birthDate}</td>
                                <td>
                                    <ClientStatusComponent
                                        id={client.id}
                                        isActive={client.isActive}
                                        xl={12}
                                        style={{ width: "100%" }}
                                        setErrorMessage={setErrorMessage}
                                        setSuccessMessage={setSuccessMessage}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
