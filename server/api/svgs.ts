import { JSDOM } from 'jsdom';
import * as d3 from 'd3';

function generate() {
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
  const body = d3.select(dom.window.document.body);
  const svg = body.append('svg')
      .attr('width', 400)
      .attr('height', 400)
      .attr('id', 'map');

  return body.html();
}

export default defineEventHandler((event) => {
    return {
      svg: generate()
    }
  })