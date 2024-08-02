import {vi, it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        greet.mockImplementation(name => 'Hello' + name)
        greet('Homayoun');
        expect(greet).toHaveBeenCalledOnce('Homayoun')
    })
})