export const footer = (filmsAmount) => {
  return `
        <footer class="footer">
         <section class="footer__logo logo logo--smaller">Cinemaddict</section>
         <section class="footer__statistics">
         <p>${filmsAmount} movies inside</p>
        </section>
        </footer>
 `;
};
