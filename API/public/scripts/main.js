$(document).ready(() => {
  /** Formats every tag with class Date to be of format '2 hours ago' */
  $('.date').each(function () {
    const timeCreated = $(this).text();
    const formatted = moment(timeCreated).fromNow();

    $(this).text(formatted);
  });
});
