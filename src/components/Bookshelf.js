import React from 'react'
import Book from './Book.js'


class Bookshelf extends React.Component {
	state = {

	}

	render() {
		const createBookContainer = (book) => (
			<Book
				key={book.id}
				book={book}
				changeShelf={this.props.changeShelf}
				currentShelf={this.props.shelfCode}
			/>
		)

		const bookContainers = this.props.books.map(createBookContainer)

		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{this.props.shelfTitle}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{bookContainers}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf