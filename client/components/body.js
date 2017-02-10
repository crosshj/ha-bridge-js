import React from 'react';

const sections = ['bridge', 'devices', 'newDevice'];
const sectionItems = sections.map((section, key) =>
	<section id={section + '-section'} key={key}>
		<h1>{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
		<hr/>
		<p style={{"textAlign":"center"}}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet mattis nisi a maximus. Curabitur non iaculis tellus. Sed quis nulla et leo blandit mattis id id ipsum. Praesent a dui id arcu fringilla aliquet ut vel justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Fusce in sapien mattis, ullamcorper sapien vitae, semper ex. Duis blandit magna arcu, et bibendum velit suscipit vel. Praesent dolor nisl, iaculis et consectetur sed, blandit quis enim. Sed varius felis id tortor iaculis feugiat ac id felis. Aenean interdum urna eu lectus imperdiet lacinia. Praesent accumsan elit sit amet mauris interdum luctus a at magna. Nulla libero felis, egestas a tellus vel, scelerisque consequat nunc. Sed lobortis malesuada mi, nec lacinia quam fringilla vel. Maecenas rhoncus non erat in porta. Suspendisse vitae purus elementum, vulputate orci et, sodales nunc.
		</p>
	</section>
);

function Body(){
	return (
		<div>
			{sectionItems}
		</div>
	);
}

export default Body;
