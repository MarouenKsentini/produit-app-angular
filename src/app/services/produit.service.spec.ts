import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProduitService } from './produit.service';

describe('ProduitService (Model / accès API)', () => {
  let service: ProduitService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProduitService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getAll() appelle GET /api/produits', () => {
    service.getAll().subscribe((produits) => expect(produits.length).toBe(1));
    const req = http.expectOne('/api/produits');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, libelle: 'Clavier', prix: 10, qteStock: 2 }]);
  });

  it('create() appelle POST /api/produits', () => {
    service.create({ libelle: 'Souris', prix: 25, qteStock: 3 }).subscribe();
    const req = http.expectOne('/api/produits');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 2, libelle: 'Souris', prix: 25, qteStock: 3 });
  });

  it('delete() appelle DELETE /api/produits/{id} et accepte 204', () => {
    service.delete(1).subscribe();
    const req = http.expectOne('/api/produits/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
