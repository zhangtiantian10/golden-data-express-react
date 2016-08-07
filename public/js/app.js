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
            this.setState({elements: data},() => {
                console.log(this.state.elements);
            });
        }, "json");
    }

    render() {
        return this.props.children && React.cloneElement(this.props.children, {
                onAdd: this.addForm.bind(this)
        });
    }
}

class Editor extends React.Component {
    render() {
        return <div>
            <ReactRouter.Link to="/Preview"><button>Preview</button></ReactRouter.Link>
            <RightButton onAdd={this.props.onAdd}/>
            <LeftPanel/>
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
    render() {
        return <div>
            LeftPanel
        </div>
    }
}

class Preview extends React.Component {
    render() {

        return <div>
            <ReactRouter.Link to="/"><button>Editor</button></ReactRouter.Link>
            Preview
        </div>
    }
}

ReactDOM.render(<ReactRouter.Router>
    <ReactRouter.Route path="/" component={App}>
        <ReactRouter.IndexRoute component={Editor}/>
        <ReactRouter.Route path="preview" component={Preview}/>
    </ReactRouter.Route>
</ReactRouter.Router>, document.getElementById('content'));