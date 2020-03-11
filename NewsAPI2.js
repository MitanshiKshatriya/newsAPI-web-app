import React from "react"


class NewsApi2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            country:"us"
        };
        this.getNews = this.getNews.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      console.log(this.state.value)
        this.getNews()
        
    }

    getNews() {
        console.log("http://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey=75e366b91ff7457d82a215828055adc2")
        fetch("http://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey=75e366b91ff7457d82a215828055adc2")
            .then(res => res.json())
            .then((data) => {
                this.setState({news:data.articles});
            });
            
    }

    handleChange(event) {
      console.log(event.target.value)
      this.setState({country: event.target.value});
      
      
    }
    handleSubmit(event) {
      event.preventDefault();
      this.getNews()
      
    }
    

    render() {
        //console.log(this.state.news)
        //console.log(this.state.news.length)
        //console.log(this.state.news[0])
        return (
            <div>
            <h1 className="heading-1">Articles</h1>
            <form onSubmit={this.handleSubmit}>
            <label className="drop">
         <span>Country:</span> 
          <select value={this.state.country} onChange={this.handleChange}>
            <option value="us">USA</option>
            <option value="gb">UK</option>
            <option value="in">India</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
           
          </select>
         <input type="submit" value="Submit" />
        </label>
        </form>
            <ArticleList articles={this.state.news} />
            </div>
        );
    }
}
const ArticleList = props => (
    <div className="grid-container">
        {props.articles.map((article, index) => (
          <div key={index} className="grid-item">
          <img src={article.urlToImage} className="newsImage"/>
           <h1>{article.title}</h1> 
           <p>{article.description}<span>...<a href={article.url}>more</a></span></p>
            <br />
          </div>
        ))}
    </div>
  
  );



export default NewsApi2;