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
        return <div>
            <ReactRouter.Link to="/Preview"><button>Preview</button></ReactRouter.Link>
            <RightButton onAdd={this.props.onAdd}/>
            <LeftPanel elements={this.props.elements} onDelete={this.props.onDelete}/>
        </div>;
    }
}

class RightButton extends React.Component {
    add(type) {
        this.props.onAdd(type);
    }

    render() {
        return <div>
            <button onClick={this.add.bind(this, 'text')}>Text</button>
            <button onClick={this.add.bind(this, 'date')}>Date</button>
        </div>;
    }
}

class LeftPanel extends React.Component {
    deleteForm(index) {
        this.props.onDelete(index);
    }

    render() {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
                <button onClick={this.deleteForm.bind(this, index)}>X</button>
            </div>;
        })

        return <div>
            {elements}
        </div>
    }
}

class Preview extends React.Component {
    render() {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
            </div>;
        })

        return <div>
            <ReactRouter.Link to="/"><button>Editor</button></ReactRouter.Link>
            {elements}
            <button>Sumbit</button>
        </div>
    }
}

ReactDOM.render(<ReactRouter.Router>
    <ReactRouter.Route path="/" component={App}>
        <ReactRouter.IndexRoute component={Editor}/>
        <ReactRouter.Route path="preview" component={Preview}/>
    </ReactRouter.Route>
</ReactRouter.Router>, document.getElementById('content'));