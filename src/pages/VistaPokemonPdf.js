import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getOnePokemon } from '../api/pokemon/pokemon';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    containerImage: {
        width: '100%',
        height: 'auto'
    },
    titulo: {
        textAlign: 'center',
        marginBottom: '10px',
        fontSize: '50px',
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: '400px',
        objectFit: 'contain'
    },
    containerStats: {
        marginTop: '5%',
        padding: '0 20px'
    },
    abilitiesList: {
        marginTop: '10%',
        padding: '0 20px'
    },
    titleAbilities: {
        fontWeight: 'bold',
        marginBottom: '10px',
        fontSize: '22px'
    }
});

// Create Document Component
const MyDocument = () => {
    const [dataPokemon, setDataPokemon] = useState()
    const { id } = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        const getPokemon = (id) => {
            getOnePokemon(id).then(res => {
                if (res.status !== 200) {
                    navigate('/');
                } else {
                    setDataPokemon(res.data.data)
                }
            }).catch(error => {
                navigate('/');
            })
        }
        getPokemon(id);
    }, [navigate, id])
    return (
        <>
            {dataPokemon &&
                <PDFViewer style={{ width: "100%", height: "100vh" }}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.containerImage}>
                                <Text style={styles.titulo}>{dataPokemon['name']}</Text>
                                <Image style={styles.image} src={process.env.REACT_APP_BACKEND_URL + dataPokemon['photo']}></Image>
                                <View style={styles.containerStats}>
                                    <Text>Experiencia base: {dataPokemon['base_experience']}</Text>
                                    <Text>Peso: {dataPokemon['weight']}</Text>
                                    <Text>Altura: {dataPokemon['height']}</Text>

                                    <View style={styles.abilitiesList}>
                                        <Text style={styles.titleAbilities}>Habilidades:</Text>
                                        {
                                            dataPokemon['abilities'].map((item, idx) => {
                                                return (
                                                    <Text key={idx}>* {item['name']}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            }

        </>
    );
}

export default MyDocument