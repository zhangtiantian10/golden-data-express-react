class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: []
        }
    }

    componentDidMount() {
        $.get('/api/forms/1', (elements) => {
            this.setState({elements});
        });
    }

    addForm(type) {
        $.post('/api/forms', {type},( data ) => {
            this.setState({elements: data});
        }, "json");
    }

    deleteForm(index){
        $.ajax({
            url: '/api/forms',
            type: 'DELETE',
            dataType: "json",
            data: {index: index},
            success:((elements) => {
                this.setState({elements});
            })
        })
    }

    render() {
        return this.props.children && React.cloneElement(this.props.children, {
                onAdd: this.addForm.bind(this),
                elements: this.state.elements,
                onDelete: this.deleteForm.bind(this)
        });
    }
}

class Editor extends React.Component {
    render() {
        return <div className="row">
            <div className="center">
            <ReactRouter.Link to="/Preview">
                <button type="button" className="btn btn-primary btn-lg">Preview</button>
                <br/><br/>
            </ReactRouter.Link>
                <br/>
            </div>
            <LeftPanel elements={this.props.elements} onDelete={this.props.onDelete}/>
            <RightButton onAdd={this.props.onAdd}/>
        </div>;
    }
}

class RightButton extends React.Component {
    add(type) {
        this.props.onAdd(type);
    }

    render() {
        return <div className="col-md-4">
            <div className="center">
                <button type="button" className="btn btn-link btn-lg" onClick={this.add.bind(this, 'text')}>Text</button>
            </div>
            <div className="center">
                <button type="button" className="btn btn-link btn-lg" onClick={this.add.bind(this, 'date')}>Date</button>
            </div>
        </div>;
    }
}

class LeftPanel extends React.Component {
    deleteForm(index) {
        this.props.onDelete(index);
    }

    render() {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index} className=" center">
                <input type={ele} className="form-control inline"/>
                <button type="button" className="btn btn-link btn-lg inline" onClick={this.deleteForm.bind(this, index)}>
                    <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                </button>
            </div>;
        })

        return <div className="col-md-8 groove">
            {elements}
        </div>
    }
}

class Preview extends React.Component {
    render() {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index} className="center">
                <input type={ele} className="form-control inline"/>
            </div>;
        })

        return <div>
            <div className="center">
                <ReactRouter.Link to="/">
                    <button type="button" className="btn btn-primary btn-lg">Edit</button>
                </ReactRouter.Link>
            </div>
            <br/>
            <div className="groove">
                <br/>
                <form role="form">
                    {elements}
                </form>
            </div>
            <div className="center">
                <br/>
                <button type="button" className="btn btn-primary btn-lg">Sumbit</button>
            </div>
        </div>
    }
}

ReactDOM.render(<ReactRouter.Router>
    <ReactRouter.Route path="/" component={App}>
        <ReactRouter.IndexRoute component={Editor}/>
        <ReactRouter.Route path="preview" component={Preview}/>
    </ReactRouter.Route>
</ReactRouter.Router>, document.getElementById('content'));