import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import Table from 'react-bootstrap/Table'


const formSchema = Yup.object().shape({
    "name": Yup.string().required("Name Required")
})

const imgStyle = {
    border:'solid 2px ',
    width:'100px',
    height:'100px',
  };
  

const initialValues = {
    name: ''
}


export default class Home extends Component {

    constructor() {
        super();
        this.state={
            pokemons:[],
            badName:false
        };
    }

    
    handleSubmit=({name})=>{
        name = name.toLowerCase()
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    pokemons: [data],
                    badName: false  
                }, ()=>console.log(this.state.pokemons))
            })
            .catch(error=>{console.error(error); this.setState({badName:true})})
    }    

    render() {
        return (
            <div>
                <h2>Search for a pokemon</h2>
                {this.state.badName ? <small style={{color:"red"}}>Invalid Pokemon name</small>:""}
                <Formik initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={
                            (values, {resetForm})=>{
                                this.handleSubmit(values);
                                resetForm(initialValues);
                            }
                        }
                        >
                        {
                            ({errors, touched})=>(
                                <Form>
                                    <label htmlFor="name" className="form-label">Name&nbsp;</label>
                                    <Field name="name"  />&nbsp;&nbsp;
                                    <button type="submit" className="btn btn-primary">Search</button>
                                    {errors.name && touched.name ? (<div style={{color:'red'}}>{errors.name}</div>):null}
                                    <br/><br/>
                                </Form>
                            )
                        }
                </Formik>

                {/* Pokemon display table starts here */}
                {this.state.pokemons?.length > 0  ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Sprite Image</th>
                            <th>Name</th>
                            <th>Base XP</th>
                            <th>HP</th>
                            <th>Defense</th>
                            <th>Attack</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pokemons.map(
                                pokemon => (
                                    <tr key={pokemon.id}>
                                    <td width='200px'><img src={pokemon.sprites.front_shiny} style={imgStyle} alt="pokemon-sprite-image" /></td>
                                    <th>{pokemon.name}</th>
                                    <td>{pokemon.base_experience}</td>
                                    <td>{pokemon.stats[0].base_stat}</td>
                                    <td>{pokemon.stats[2].base_stat}</td>
                                    <td>{pokemon.stats[1].base_stat}</td>
                                    </tr>
                                )
                            )
                            
                            }
                        </tbody>
                    </Table>
                :''}

            </div>
        )
    }
}
