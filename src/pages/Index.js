
import Modal from '../components/Modal';
import Form from "../components/Form"
import IndexProvider from '../contexts/IndexContext';
import ListaPokemons from '../components/ListaPokemons';


const Index = () => {
    return (
        <>
            <IndexProvider>
                <div className="container mx-auto">
                    <div className='flex justify-end my-5'>
                        <Modal>
                            <Form></Form>
                        </Modal>
                        <Modal editing={true}>
                            <Form formEdit={true}></Form>
                        </Modal>
                    </div>
                    <ListaPokemons />
                </div>
            </IndexProvider>
        </>
    )
}

export default Index