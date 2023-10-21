export const loadingTodosObserver = (fetch) => {
  let nextPage = 2;

  return new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        fetch(nextPage++);
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.5,
      rootMargin: "50px 0px 0px 0px",
    }
  );
};
