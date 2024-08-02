import {vi, it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        greet.mockImplementation(name => 'Hello' + name)
        greet('Homayoun');
        expect(greet).toHaveBeenCalledOnce('Homayoun')
    });
    it('should send text message', () => {
        const sendText = vi.fn();
        sendText.mockReturnValue('ok')
        const result = sendText('message');
        expect(sendText).toHaveBeenCalledWith('message');
        expect(result).toBe('ok')
    })
})