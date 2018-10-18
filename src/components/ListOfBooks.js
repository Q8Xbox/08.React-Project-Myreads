import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

class ListOfBooks extends React.Component {
	state = {

	}


	render() {
		return (
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReads</h1>
				</div>
				<div className='list-books-content'>
					<div>
						<Bookshelf
							books={this.props.currentlyReadingBooks}
							shelfTitle='Currently Reading'
							shelfCode='currentlyReading'
							changeShelf={this.props.changeShelf}
						/>
						<Bookshelf
							books={this.props.wantToReadBooks}
							shelfTitle='Want to Read'
							shelfCode='wantToRead'
							changeShelf={this.props.changeShelf}
						/>
						<Bookshelf
							books={this.props.readBooks}
							shelfTitle='Read'
							shelfCode='read'
							changeShelf={this.props.changeShelf}
						/>
					</div>
				</div>
				<div className='open-search'>
					<Link
						to='/search'
					>Add a book</Link>
				</div>
			</div>
		)
	}
}

export default ListOfBooks