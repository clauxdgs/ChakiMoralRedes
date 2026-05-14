const PLAYLIST_ID =
     "PL72IZwaeiCyozJN80o3tftpNBlfZQo5F8";

const RSS_URL =
     `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;

const API_URL =
     `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

const container =
     document.getElementById("videos");

/* =========================
   CARGAR VIDEOS
========================= */

async function cargarVideos() {

     try {

          mostrarLoader();

          const response =
               await fetch(API_URL);

          if (!response.ok) {

               throw new Error(
                    "No se pudo cargar la playlist"
               );
          }

          const data =
               await response.json();

          const videos =
               data.items;

          container.innerHTML = "";

          videos.forEach((video, index) => {

               const videoId =
                    extraerVideoID(video.link);

               const thumbnail =
                    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

               const card =
                    document.createElement("article");

               card.className =
                    "video-card";

               card.style.animationDelay =
                    `${index * 0.08}s`;

               card.innerHTML = `

                    <img
                         src="${thumbnail}"
                         alt="${video.title}"
                         loading="lazy"
                    >

                    <div class="video-info">

                         <h3>${video.title}</h3>

                         <a
                              href="${video.link}"
                              target="_blank"
                              rel="noopener noreferrer"
                         >

                              <i class="fa-solid fa-play"></i>

                              Ver capítulo

                         </a>

                    </div>

               `;

               container.appendChild(card);

          });

     } catch (error) {

          mostrarError();

          console.error(error);
     }
}

/* =========================
   EXTRAER ID
========================= */

function extraerVideoID(url) {

     const match =
          url.match(/v=([^&]+)/);

     return match ?
          match[1] :
          "";
}

/* =========================
   LOADER
========================= */

function mostrarLoader() {

     container.innerHTML = `

          <div class="loader">

               <div class="spinner"></div>

               <p>Cargando capítulos...</p>

          </div>

     `;
}

/* =========================
   ERROR
========================= */

function mostrarError() {

     container.innerHTML = `

          <div class="error-box">

               <i class="fa-solid fa-triangle-exclamation"></i>

               <p>

                    Ocurrió un error cargando los videos.

               </p>

          </div>

     `;
}

/* =========================
   INIT
========================= */

cargarVideos();