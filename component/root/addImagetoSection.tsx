import Button from '@material-ui/core/Button'

function Container({children}){
    return <div>
    <div className="container-fluid">
        {children}
    </div>
    <div className="p-2" style={{position:"absolute",bottom:0,left:0,width:"100%"}}>
        <div className="d-flex justify-content-end">
            <div className="btn-group float-right"> 
                <button className="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
}

function BootstrapInputField(props){
    return <div className="row">            
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <input type={props.type} onChange={props.change} defaultValue={props.value} className="form-control" id={props.id} required /> 
        </div>
    </div>
}
function BootstrapTextArea(props){
    return <div className="row">            
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <textarea className="form-control" onChange={props.change} defaultValue={props.value} id={props.id} cols={30} rows={3}></textarea>
        </div>
    </div>
}

function SelectInput(props){
    return <div className="row">            
    <div className="col-md-2"></div>
    <div className="col-md-8">
        <label htmlFor={props.id} className="form-label">{props.label}</label>
        <select className="form-select" id={props.id} required >
            {props.options.map((data,key)=>(
                <option key={key} value={data.key}> {data.value} </option>
            ))}
        </select> 
    </div>
</div>
}

export default function AddImagetoSectionModal(props){
    
    return <Container>
{/*  
    <SelectInput id="language" label="Language *" options={[
        {key:0,value:"English"},
        {key:1,value:"Hindi"},
    ]} />
     */}
    <BootstrapInputField id="image" label="Image *" type="file" change={props.image} />

    <BootstrapInputField id="path" label="Image Path *" type="text" change={props.path} />
    
    {/* <BootstrapTextArea id="desc" label="Product Description *" value={props.values.desc} change={props.desc} /> */}

        
    </Container>
}