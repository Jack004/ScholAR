var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/* Inizializza array con nomi target orientati alla visualizzazione di video
		*  array bidimensionale con nome della zona come prima colonna e
		*  numero indirizzo come seconda colonna
		*  0 = informatica
		*  1 = chimica
		*  2 = elettronica
		*  3 = meccanica
		*  4 = logistica
		*  5 = biennio
		*  6 = altro
		*/
		var arrayVideo = [
			["palazzinainformatica" , 0],
			["palestracatellani" , 6],
			["labelettronicainf" , 0],
			["labfisica" , 5],
			["labchim" , 1],
			["labsis" , 0],
			["labinf" , 0]
		];
		
		/* Inizializza array con nomi target orientati alla visualizzazione di immagini
		*/
		var arrayImmagini = [
			"pianoterrabiennio",
			"primopianobiennio",
			"secondopianobiennio",
			"orari"
		];
		
		// Inizializza ClientTracker
		AR.context.scene.globalScale = 2;
		this.tracker = new AR.ClientTracker("assets/scholAR.wtc", {
			onLoaded: this.worldLoaded
		});

		var exitButtonImg = new AR.ImageResource("assets/exitbutton.png");
		var exitButton = new AR.ImageDrawable(exitButtonImg, 0.2, {
			offsetY: 0.82,
			offsetX: 1.55,
			enabled: false,
			onClick: function(){
				for(i = 0; i <= World.pagine.length; i++)
					World.pagine[i].snapToScreen.enabled = false;
				}
		});

		var immagineLink = new AR.ImageResource("assets/cliccamilink.png");
		var immagineOrariLink = new AR.ImageResource("assets/orarilink.png");
		this.immagineOrariButton = new AR.ImageDrawable(immagineOrariLink, 0.22, {
				offsetY: -0.70,
				onClick: function(){
					AR.context.openInBrowser("http://applicazioni.itis.pr.it/orario/", true);
				}
			});
		this.video = [];
		this.uriImmagini = [];
		this.immagini = []
		this.pagine = [];
		this.immagineButton = []
		numeroZoneVideo = arrayVideo.length;
		numeroZoneImmagini = arrayImmagini.length;

		//cicli per creazione immagini
		for(i = 0; i < numeroZoneImmagini; i++){
			this.uriImmagini[i] = new AR.ImageResource("assets/" + arrayImmagini[i] + ".png");

		}
        for(i = 0; i < numeroZoneImmagini; i++){
           this.immagini[arrayImmagini[i]] = new AR.ImageDrawable(this.uriImmagini[i], 1.4, {
                offsetY: 0.21
           });
        }

		//ciclo crea video e link al sito
		for(i = 0; i < numeroZoneVideo; i++){


			//link
		    this.immagineButton[i] = new AR.ImageDrawable(immagineLink, 0.22, {
                                offsetY: -0.70,
                            });
		    switch(arrayVideo[i][1]){
		        case 0:
		            this.immagineButton[i].onClick =  function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/orientamento/informatica/", true);
                        };
                    break;
		        case 1:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/orientamento/chimica-materiali-e-biotecnologie/", true);
                        };
                    break;
		        case 2:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/elettronica-e-elettrotecnica/", true);
                        };
                    break;
		        case 3:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/orientamento/meccanica-meccatronica-e-energia/", true);
                        };
                    break;
		        case 4:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/orientamento/trasporti-e-logistica/", true);
                        };
                    break;
		        case 5:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/orientamento/", true);
                        };
                    break;
		        case 6:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/informazioni-sulla-scuola/attrezzature-laboratori-e-sussidi-didattici/", true);
                        };
                    break;
		        default:
                    this.immagineButton[i].onClick = function apriSito() {
                            AR.context.openInBrowser("http://www.itis.pr.it/", true);
                        };
                    break;
            }
			
			//video
			this.video[arrayVideo[i][0]] = new AR.VideoDrawable("assets/" + arrayVideo[i][0] +".mp4", 1.35, {
				offsetY: 0.21,
				enabled: false,
				onClick: function videoClicked(oggettoAR) {
					if (this.playing) {
						this.pause();
						this.playing = false;
					} else {
						this.resume();
						this.playing = true;
					}
				}
			});
		}

		//ciclo creazione pagine con video
		for(i = 0; i < numeroZoneVideo; i++){
			this.pagine[i] = new AR.Trackable2DObject(this.tracker, arrayVideo[i][0], {
				drawables: {
					cam: [World.video[arrayVideo[i][0]], exitButton, World.immagineButton[i]]
				},

				onEnterFieldOfVision: function onEnterFieldOfVisionFn() {
					for(j = 0; j < World.pagine.length; j++)
						World.pagine[j].snapToScreen.enabled = false;
					if(!this.drawables.cam[0].enabled){
						this.drawables.cam[0].play(-1);
						this.drawables.cam[0].enabled = true;
					}
					exitButton.enabled = false;
					AR.context.scene.globalScale = 2; 
				},

				onExitFieldOfVision: function onExitFieldOfVisionFn() {
					exitButton.enabled = true;
					AR.context.scene.globalScale = 1; 

				},
				
				snapToScreen: {
					enabledOnExitFieldOfVision: true,
					snapContainer: document.getElementById('snapContainer')
				}
			});
		}
		
		//ciclo creazione pagine con immagini
		for(i = 0; i < numeroZoneImmagini; i++){
			this.pagine[i] = new AR.Trackable2DObject(this.tracker, arrayImmagini[i], {
				drawables: {
					cam: [World.immagini[arrayImmagini[i]], exitButton, World.immagineOrariButton]
				},
				
				onEnterFieldOfVision: function onEnterFieldOfVisionFn() {
					for(j = 0; j < World.pagine.length; j++)
						World.pagine[j].snapToScreen.enabled = false;
					exitButton.enabled = false;
					AR.context.scene.globalScale = 2; 
				},
				
				onExitFieldOfVision: function onExitFieldOfVisionFn() {
					exitButton.enabled = true;
					AR.context.scene.globalScale = 1; 

				},
				
				snapToScreen: {
					enabledOnExitFieldOfVision: true,
					snapContainer: document.getElementById('snapContainer')
				}
			});
		}
	
	}

};

World.init();