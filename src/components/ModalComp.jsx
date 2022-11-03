import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box
} from "@chakra-ui/react"
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [num, setNum] = useState(dataEdit.num || "");
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const [username, setUsername] = useState(dataEdit.username || "");
    const handleSave = async () => {
        let localNum = ''
        if (!name || !email) return;
        if (emailAlreadyExists()) {
            return alert("E-mail já existe!");
        }

        console.log(dataEdit)
        console.log(data)
        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { num, name, email, username };
        }
        else {
            await fetch('https://fakestoreapi.com/users', {
                method: "POST",
                body: JSON.stringify(
                    {
                        email: email,
                        name: name,
                        username: username
                    }
                )
            }).then(function (response) {
                return response.json();
            })
                .then(function (jsonData) {
                    setNum(jsonData['id'])
                    localNum = jsonData['id']
                    setNum(localNum)
                    console.log('request')
                    console.log(localNum)
                    console.log(jsonData)

                })
            console.log(localNum)
            console.log(num)
        }





        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { num: localNum, name, email, username }]
            : [...(data ? data : [])];




        localStorage.setItem("cadastro_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }

        return false;
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Clientes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <Input
                                    type="hidden"
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;