import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => (
		<div>
			{parts.map((part) => <Part key={part.id} part={part} />)}
			<Total total={parts.reduce((acc, part) => acc += part.exercises, 0)} />
		</div>
)

export default Content