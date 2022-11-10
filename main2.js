let intro = new Audio();
intro.src="./marvel-intro-new.mp3"



Swal.fire({
    html: 'Presiona play para que se reproduzca la música',
   width:'300px',
  height:'100px',
  background:'red',
  color:'white',
  position:'sticky',
 
    confirmButtonText: 'play',
    showCancelButton: true,
   
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      intro.play();
    } else if (result.isDenied) {
      
    }
  })
