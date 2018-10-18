import React from 'react'


class Book extends React.Component {
	state = {
	}

	render() {
		let bookThumbnail
		if (this.props.book.imageLinks) {
			bookThumbnail = this.props.book.imageLinks.thumbnail
		} else {
			bookThumbnail = ''
		}

		let bookAuthor = this.props.book.authors ? this.props.book.authors : this.props.book.authors = ''

		let whenOnChange = (event) =>	{
			this.props.changeShelf(this.props.book, event.target.value)
		}

		whenOnChange = whenOnChange.bind(this)

		return (
			<li>
				<div className='book'>
					<div className='book-top'>
						<div
							className='book-cover'
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${bookThumbnail})`
							}}
						></div>
						<div className='book-shelf-changer'>
							<select
								onChange={whenOnChange}
								value={this.props.currentShelf}
							>
								<option value='move' disabled>Move to...</option>
								<option value='currentlyReading'>Currently Reading</option>
								<option value='wantToRead'>Want to Read</option>
								<option value='read'>Read</option>
								<option value='none'>None</option>
							</select>
						</div>
					</div>
					<div className='book-title'>{this.props.book.title}</div>
					<div className='book-authors'>{bookAuthor}</div>
				</div>
			</li>
		)
	}
}

export default Book