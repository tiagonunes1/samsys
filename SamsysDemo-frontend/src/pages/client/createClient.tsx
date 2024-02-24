import { useState } from "react";
import { Row, Col } from "reactstrap";
import { ClientCreateDTO } from "../../models/client/clientCreateDTO"; 
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";

export default function CreateClient() {
    const [newClient, setNewClient] = useState<ClientCreateDTO>({
        name: "",
        phoneNumber: "",
        birthDate: "", 
    });

    const [isActive, setIsActive] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const clientService = new ClientService();

    const createClient = async () => {
        const resultCreateClient: MessagingHelper<ClientCreateDTO | null> = await clientService.Create(newClient);

        if (resultCreateClient.success === false) {
            setErrorMessage(resultCreateClient.message);
            setSuccessMessage("");
            return;
        }

        setSuccessMessage("Cliente criado com sucesso");
        setErrorMessage("");
        setNewClient({
            name: "",
            phoneNumber: "",
            birthDate: "",  
        });
    };

    return (
        <>
            <div style={{ width: "100%" }}>
                <Row>
                    <Col xl={12}>
                        <h1>Criar Cliente</h1>
                    </Col>
                </Row>
            </div>

            <div style={{ width: "20%", marginTop: "2em", display: "inline-block" }}>
                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Nome: </label>
                    </Col>
                    <Col xl={6}>
                        <input
                            type="text"
                            value={newClient.name}
                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Contacto: </label>
                    </Col>
                    <Col xl={6}>
                        <input
                            type="text"
                            value={newClient.phoneNumber}
                            onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Data de Nascimento: </label>
                    </Col>
                    <Col xl={6}>
                        <input
                            type="date"
                            value={newClient.birthDate}
                            onChange={(e) => setNewClient({ ...newClient, birthDate: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <button className="btnCreateClient" onClick={createClient}>
                            Criar Cliente
                        </button>
                    </Col>
                </Row>

                <Row>
                    <ClientStatusComponent
                        id={0}  
                        isActive={isActive}
                        xl={12}
                        style={{ width: "100%", marginTop: "1em" }}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </Row>

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
            </div>
        </>
    );
}
